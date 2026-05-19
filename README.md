# 🏆 World Cup 2026 Countdown

Una aplicación interactiva de conteo regresivo hacia la Copa Mundial FIFA 2026. Construida con React, TypeScript y Vite para proporcionar una experiencia rápida y responsiva.

## 📋 Características

- ⏱️ **Countdown en Tiempo Real**: Muestra el tiempo restante para el inicio del Mundial 2026
- 📱 **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio
- 🎨 **Interfaz Atractiva**: Fondo heroico con animaciones suave
- ⚡ **Rendimiento Optimizado**: Construido con Vite para tiempos de desarrollo y compilación rápidos

## 🛠️ Tecnologías Utilizadas

- **React**: Librería de UI moderna
- **TypeScript**: Tipado estático para mayor seguridad
- **Vite**: Build tool ultrarrápido
- **ESLint**: Linting para mantener código limpio
- **React Compiler**: Optimizaciones automáticas de rendimiento

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

### Pasos para Instalar

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd worldcup-2026
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

4. **Compilar para producción**
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Countdown.tsx          # Componente principal de conteo
│   ├── CountdownUnit.tsx      # Unidad individual (días, horas, etc)
│   ├── Herobackground.tsx     # Fondo heroico
│   └── shared/
│       └── Footer.tsx         # Pie de página
├── hooks/
│   └── useCountDown.ts        # Hook personalizado para el countdown
├── interfaces/
│   ├── ball.interface.ts
│   ├── countdown.interface.ts
│   └── time-left.interface.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🔧 Configuración de ESLint

Este proyecto incluye ESLint configurado con reglas de TypeScript. Para expandir la configuración con reglas más estrictas, consulta [eslint.config.js](./eslint.config.js) y el archivo [vite.config.ts](./vite.config.ts).

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo con HMR
npm run build    # Compila el proyecto para producción
npm run lint     # Ejecuta ESLint para verificar el código
npm run preview  # Previsualiza la compilación de producción localmente
```

## 📝 Licencia

Este proyecto está disponible bajo una licencia abierta. Siéntete libre de usarlo y modificarlo.
