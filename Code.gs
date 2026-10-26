const CONFIG = {
  // Reemplazar por el ID de la planilla de Google Sheets
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',

  SHEET_MOVIMIENTOS: 'Movimientos',
  FIRST_DATA_ROW: 4,
  TOTAL_UNITS: 8,
  INITIAL_BALANCE: 0
};

function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Consorcio Brisas del Sur')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_MOVIMIENTOS);

  if (!sheet) {
    throw new Error('No se encontró la hoja "Movimientos".');
  }

  const lastRow = sheet.getLastRow();

  if (lastRow < CONFIG.FIRST_DATA_ROW) {
    return {
      months: [],
      categories: [],
      monthly: [],
      movements: []
    };
  }

  const rows = sheet
    .getRange(
      CONFIG.FIRST_DATA_ROW,
      1,
      lastRow - CONFIG.FIRST_DATA_ROW + 1,
      14
    )
    .getValues();

  const tz = ss.getSpreadsheetTimeZone();

  const movements = rows
    .filter(row => row[1] instanceof Date && row[3] && row[4])
    .map(row => {

      const date = row[1];

      const monthDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      );

      return {
        id: row[0] || '',
        date: Utilities.formatDate(date, tz, 'dd/MM/yyyy'),
        dateValue: date.getTime(),

        monthKey: Utilities.formatDate(
          monthDate,
          tz,
          'yyyy-MM'
        ),

        monthLabel: formatMonthLabel(monthDate),

        type: cleanText(row[3]),
        category: cleanText(row[4]),
        subcategory: cleanText(row[5]),
        unit: cleanText(row[6]),
        description: cleanText(row[7]),
        person: cleanText(row[8]),
        paymentMethod: cleanText(row[9]),

        amount: Number(row[10]) || 0,

        receipt: cleanText(row[11]),
        status: row[12],
        notes: cleanText(row[13])
      };
    })

    // Solo movimientos vigentes
    .filter(m => m.status !== false);


  const monthMap = {};


  movements.forEach(m => {

    if (!monthMap[m.monthKey]) {

      monthMap[m.monthKey] = {

        key: m.monthKey,
        label: m.monthLabel,

        // INGRESOS
        expensas: 0,
        electricityCollected: 0,
        yields: 0,
        otherIncome: 0,
        totalIncome: 0,

        // EGRESOS
        maintenance: 0,
        electricityPaid: 0,
        otherExpenses: 0,
        totalExpenses: 0,

        // RESULTADOS
        result: 0,
        openingBalance: 0,
        closingBalance: 0,

        // GESTIÓN SIN ELECTRICIDAD
        managementIncome: 0,
        managementExpenses: 0,
        managementResult: 0,

        // OTROS DATOS
        unitsPaid: new Set(),
        maintenanceBreakdown: {},
        electricityPayments: []
      };
    }


    const month = monthMap[m.monthKey];


    // =============================
    // INGRESOS
    // =============================

    if (m.type === 'INGRESO') {

      month.totalIncome += m.amount;

      if (m.category === 'EXPENSAS') {

        month.expensas += m.amount;

        if (m.unit) {
          month.unitsPaid.add(m.unit);
        }

      }

      else if (m.category === 'ELECTRICIDAD') {

        month.electricityCollected += m.amount;

      }

      else if (m.category === 'RENDIMIENTOS') {

        month.yields += m.amount;

      }

      else {

        month.otherIncome += m.amount;

      }
    }


    // =============================
    // EGRESOS
    // =============================

    if (m.type === 'EGRESO') {

      const expense = Math.abs(m.amount);

      month.totalExpenses += expense;


      if (m.category === 'MANTENIMIENTO') {

        month.maintenance += expense;

        const sub = m.subcategory || 'OTROS';

        if (!month.maintenanceBreakdown[sub]) {
          month.maintenanceBreakdown[sub] = 0;
        }

        month.maintenanceBreakdown[sub] += expense;

      }

      else if (m.category === 'ELECTRICIDAD') {

        month.electricityPaid += expense;

        month.electricityPayments.push({
          date: m.date,
          amount: expense,
          description: m.description
        });

      }

      else {

        month.otherExpenses += expense;

      }
    }

  });


  // =============================
  // RESUMEN MENSUAL
  // =============================

  const monthly = Object.values(monthMap)
    .sort((a, b) => a.key.localeCompare(b.key));


  let balance = CONFIG.INITIAL_BALANCE;


  monthly.forEach(month => {

    // --------------------------------
    // SALDO REAL DE LA CUENTA
    // Incluye electricidad
    // --------------------------------

    month.openingBalance = balance;

    month.result =
      month.totalIncome -
      month.totalExpenses;

    balance += month.result;

    month.closingBalance = balance;


    // --------------------------------
    // GESTIÓN DEL CONSORCIO
    // EXCLUYE ELECTRICIDAD
    // --------------------------------

    month.managementIncome =
      month.expensas +
      month.yields +
      month.otherIncome;

    month.managementExpenses =
      month.maintenance +
      month.otherExpenses;

    month.managementResult =
      month.managementIncome -
      month.managementExpenses;


    // --------------------------------
    // UNIDADES
    // --------------------------------

    month.unitsPaidCount =
      month.unitsPaid.size;

    month.unitsTotal =
      CONFIG.TOTAL_UNITS;


    // --------------------------------
    // MANTENIMIENTO
    // --------------------------------

    month.maintenanceBreakdown =
      Object.entries(
        month.maintenanceBreakdown
      ).map(([name, amount]) => ({
        name,
        amount
      }));


    delete month.unitsPaid;

  });


  // =============================
  // CATEGORÍAS
  // =============================

  const categories = [
    ...new Set(
      movements
        .map(m => m.category)
        .filter(Boolean)
    )
  ].sort();


  return {

    months: monthly.map(m => ({
      key: m.key,
      label: m.label
    })),

    categories,

    monthly,

    movements: movements.sort(
      (a, b) => b.dateValue - a.dateValue
    )

  };

}


function formatMonthLabel(date) {

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  return (
    months[date.getMonth()] +
    ' ' +
    date.getFullYear()
  );
}


function cleanText(value) {

  return value === null ||
         value === undefined
    ? ''
    : String(value)
        .trim()
        .toUpperCase();

}
