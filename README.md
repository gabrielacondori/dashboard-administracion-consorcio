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
