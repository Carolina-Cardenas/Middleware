import express from "express";

const app= express();

const PORT = 3000;


//  Middleware de Registro: Registra cada solicitud que llega al servidor
app.use (  (req,res,next) => {
    console.log (`Request received at ${new Date().toLocaleString()} for ${req.url}`);
    next() 
});
// 2. Middleware de Autenticación: Verifica si el usuario está autenticado
app.use((req, res, next) => {
const userAuthenticated = true;
const userRole = 'user';
req.user = { isAuthenticated: userAuthenticated, role: userRole };
if (!userAuthenticated) {
    return res.status(403).send("You are not allowed to make this request");
  }
  next();
});

// 3. Middleware de Administración: Solo permite el acceso si el usuario tiene el rol de 'admin'
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send("Admin access only");
    }
    next();
  };
// Rutas

// Ruta pública: accesible para cualquier usuario autenticado
  app.get('/dashboard', (req, res) => {
    res.send(`Welcome to the user dashboard!`);
  });
// Ruta de administración: solo accesible para usuarios con rol de 'admin'
  app.get('/admin', adminMiddleware, (req, res) => {
    res.send("Welcome to the admin page!");
  });
// Inicia el servidor
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });





