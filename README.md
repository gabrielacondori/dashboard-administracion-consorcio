# Dashboard de Administración Financiera

Sistema de gestión y visualización desarrollado para centralizar y analizar la información financiera de un consorcio.

El proyecto parte de una necesidad concreta de administración: transformar registros mensuales de ingresos y egresos en información clara, trazable y fácil de consultar para la toma de decisiones y la comunicación con los propietarios.

## Objetivo del proyecto

Diseñar una solución simple y accesible que permita:

- Centralizar los movimientos financieros.
- Consultar información por período.
- Controlar el cobro de expensas.
- Analizar gastos de mantenimiento.
- Monitorear la evolución del fondo disponible.
- Separar los gastos propios de gestión de conceptos transitorios como el servicio de electricidad.
- Facilitar la rendición y comunicación de información financiera.

## Funcionalidades

El dashboard permite seleccionar un período y visualizar automáticamente:

- Saldo inicial y saldo final.
- Ingresos del consorcio.
- Gastos de gestión.
- Resultado mensual.
- Expensas cobradas.
- Unidades al día.
- Rendimientos financieros.
- Evolución histórica del fondo.
- Comparación entre expensas y gastos de mantenimiento.
- Composición de los gastos de mantenimiento.
- Información mensual sobre el pago de electricidad.
- Detalle de movimientos filtrado por categoría.

## Vista del dashboard

### Resumen financiero

![Dashboard principal](Captura%20de%20pantalla%202026-10-26%20210346.png)

### Indicadores y gráficos de gestión

![Gráficos de gestión](Captura%20de%20pantalla%202026-10-26%20210420.png)

### Detalle de movimientos

![Detalle de movimientos](Captura%20de%20pantalla%202026-10-26%20210438.png)

## Arquitectura

La solución utiliza Google Sheets como fuente de datos y Google Apps Script como capa de procesamiento.

```text
Google Sheets
     │
     ▼
Google Apps Script
     │
     ▼
HTML + CSS + JavaScript
     │
     ▼
Dashboard web
```

La información se procesa automáticamente a partir de una base estructurada de movimientos, evitando la carga manual de indicadores en el dashboard.

## Tecnologías utilizadas

- Google Sheets
- Google Apps Script
- JavaScript
- HTML5
- CSS3
- Google Charts

## Lógica de gestión

El modelo diferencia entre los movimientos generales de la cuenta y los movimientos propios de la gestión.

Los ingresos y gastos vinculados al servicio de electricidad se mantienen registrados para conservar la trazabilidad financiera y determinar correctamente el saldo real de la cuenta.

Sin embargo, se presentan de forma separada de los indicadores de gestión, ya que corresponden a fondos recaudados específicamente para el pago del servicio.

De esta manera, el dashboard permite analizar con mayor claridad:

- Ingresos propios del consorcio.
- Gastos de mantenimiento.
- Resultado de gestión.
- Fondo acumulado.
- Cumplimiento de expensas.
- Rendimientos financieros.

## Procesamiento de la información

Los movimientos se registran en una base estructurada dentro de Google Sheets.

Google Apps Script procesa automáticamente los registros y los agrupa por período y categoría para generar los indicadores utilizados por el dashboard.

El sistema calcula, entre otros:

- Saldo inicial del período.
- Ingresos y egresos.
- Resultado mensual.
- Saldo final acumulado.
- Ingresos y gastos propios de gestión.
- Unidades con expensas registradas.
- Gastos de mantenimiento por concepto.
- Pagos correspondientes al servicio de electricidad.

Esto permite mantener separada la base de datos de la capa de visualización y reducir la necesidad de realizar cálculos manuales para cada informe.

## Diseño y visualización

La interfaz fue desarrollada con un diseño responsive para permitir su consulta tanto desde computadoras como desde dispositivos móviles.

El dashboard incorpora:

- Tarjetas de indicadores.
- Selector dinámico de período.
- Gráficos históricos.
- Comparaciones mensuales.
- Distribución de gastos.
- Tabla de movimientos.
- Filtros por categoría.

Google Charts se utiliza para generar las visualizaciones a partir de la información procesada por Apps Script.

## Privacidad

Este repositorio corresponde a una versión demostrativa del proyecto.

Los datos personales, identificadores de Google Sheets, documentación y demás información sensible utilizados en la implementación real fueron omitidos o anonimizados.

El código publicado utiliza un identificador genérico:

```javascript
SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID'
```

De esta manera se puede mostrar la estructura y lógica del proyecto sin exponer la fuente de datos real.

## Posibles mejoras

El proyecto contempla futuras integraciones y mejoras, entre ellas:

- Portal informativo mediante Google Sites.
- Automatización de reportes mensuales.
- Generación de comprobantes y documentación.
- Incorporación de presupuestos y mantenimientos.
- Mayor automatización de la carga y validación de datos.
- Incorporación de nuevos indicadores de gestión.
- Desarrollo de reportes históricos y comparativos.

## Sobre el proyecto

Proyecto desarrollado como aplicación práctica de herramientas de administración financiera, control de gestión, automatización y visualización de datos.

El foco principal no está únicamente en la construcción del dashboard, sino en el diseño de una estructura de información que permita transformar movimientos administrativos en indicadores útiles para la gestión y la toma de decisiones.
