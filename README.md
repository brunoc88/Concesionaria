# 🚗 Concesionaria de Autos

Sistema de gestión de una concesionaria que permite administrar empleados, clientes, vehículos y contratos. Desarrollado con fines educativos para reforzar conocimientos en desarrollo web fullstack con Node.js y Sequelize.

---

## 📌 Funcionalidades principales

- Autenticación de empleados con JWT (almacenado en cookies)
- Protecciones de rutas para usuarios no autenticados
- CRUD de empleados, clientes, vehículos y contratos
- Borrado lógico en empleados, clientes y vehículos
- Control de duplicados en datos sensibles
- Validación de cambios antes de editar registros
- Restricciones de seguridad por rol y propiedad de datos
- UI dinámica con Bootstrap 5 + DataTables

---

## 🧩 Estructura del sistema

### Empleados
- Registro, edición y baja lógica.
- Solo pueden editar su propio perfil.
- No pueden acceder a rutas de otros usuarios.

### Clientes
- Alta, edición, activación/desactivación.
- Borrado lógico (cambio de estado).

### Vehículos
- Alta, edición, activación/desactivación.
- Solo se permite activar vehículos con stock (`cantidad > 0`).
- Detección de duplicados por modelo, marca, color y año.

### Contratos
- Alta de contrato asociando cliente, vehículo y empleado.
- Muestra datos relacionados de forma legible.
- Validación de selección y datos disponibles.

---

## 🔒 Seguridad

- Empleados autenticados acceden a funcionalidades completas.
- Los intentos de acceder a datos o perfiles ajenos son bloqueados.
- Al eliminar una cuenta, esta no puede reactivarse desde la UI (requiere intervención en la base de datos).
- Uso de JWT para asegurar sesiones.
- Verificación de token en cada ruta protegida (`checkToken`).

---

## ⚙️ Tecnologías utilizadas

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [JWT](https://jwt.io/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

### Frontend
- [Pug](https://pugjs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [DataTables](https://datatables.net/)





