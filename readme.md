# UserManagementApp

Aplicación full stack construida con **ASP.NET Core Web API**, **Entity Framework Core**, **Clean Architecture** y **Angular**, que permite la gestión de usuarios y visualización de productos con dashboard gráfico.

---

## 🚀 Tecnologías utilizadas

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- Clean Architecture

### Frontend
- Angular 16 / Angular CLI
- Chart.js + ng2-charts
- Angular Material

---

## 📦 Funcionalidades principales

### Usuarios
- Registro y Login con JWT
- Roles: **Admin / User**
- Solo Admin puede ver:
  - Gráfico de usuarios
  - ABM de usuarios

### Productos
- Visualización gráfica de stock con Chart.js
- Seed inicial con productos cargados automáticamente

---

## 🧑‍💻 1) Requisitos previos

| Herramienta | Necesaria |
|------------|:--------:|
| Visual Studio 2022 | ✔ |
| SQL Server | ✔ |
| .NET 8 SDK | ✔ |
| Node.js + Angular CLI | ✔ |
| Visual Studio Code (opcional) | ✔ |

---

## 🛠 2) Clonar el repositorio

```sh
git clone https://github.com/jcoruegit/UserManagementApp.git
```

---

## ⚙ 3) Configurar base de datos

Editar el archivo:
```
/Backend/UserManagementApp.API/appsettings.json
```

Modificar la cadena de conexión, por ejemplo:
```json
"DefaultConnection": "Server=localhost;Database=UserManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

📌 Puede elegir cualquier nombre de base de datos. Si no existe, se crea automáticamente al ejecutar la migración.

---

## 🗄 4) Crear la base y aplicar migraciones

📍 En **Visual Studio**, abrir **Package Manager Console**

Seleccionar proyecto **Infrastructure** como proyecto predeterminado y ejecutar:
```powershell
Update-Database
```

Esto realizará:
- Creación de base de datos
- Creación de tablas
- Inserción automática de datos iniciales (usuario admin y productos)

### 🧪 Usuario de prueba generado automáticamente
| Usuario | Contraseña | Rol |
|---------|-----------|------|
| admin | admin | Admin |

---

## ▶ 5) Ejecutar la API

En la carpeta `/Backend`:

- Establecer `UserManagementApp.API` como proyecto de inicio
- Ejecutar con **F5**

La API quedará disponible en:
```
https://localhost:7016/
https://localhost:7016/swagger/index.html
```

---

## 🌐 6) Ejecutar el Frontend

Abrir terminal en:
```
/Frontend/UserManagementApp.FrontEnd
```
Ejecutar:
```sh
npm install
npm start
```

Abrir en el navegador:
```
http://localhost:4200
```

---

## 🖼 Dashboard

| Rol | Vista |
|-----|-------|
| Admin | Gráfico de usuarios + productos |
| User | Solo gráfico de productos |

---

## 📌 Nota importante sobre el Frontend

Si bien el proyecto incluye una aplicación en Angular con Angular Material, su objetivo principal es funcionar como una interfaz sencilla para consumir el backend.

La mayor parte del diseño, arquitectura y lógica compleja del proyecto se encuentra en el Backend, donde se aplican:

Clean Architecture

Entity Framework Core

Repositorios

Servicios y validaciones

Migraciones + datos seed

JWT + autorización por roles

Estructura modularizada y escalable

El Frontend fue diseñado de manera deliberadamente simple para mantener el enfoque en la API y en la arquitectura backend.

---

## 📝 Licencia

Este proyecto está bajo licencia **MIT** — ver archivo `LICENSE` para más detalles.

---

## 🤝 Contribuciones

Actualmente **no se aceptan contribuciones externas**. Solo el autor puede realizar cambios en el repositorio principal.

