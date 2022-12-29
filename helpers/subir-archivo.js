const { v4: uuidv4 } = require('uuid');
const path = require('path');
const extensionesDefault = ['png', 'jpg', 'jpeg', 'gif'];

const subirArchivo = ( files, carpeta = '' , extensionesValidas = extensionesDefault) => {

    return new Promise((resolve, reject) => {
        if (!files) {
            return reject('No se han encontrado archivos por subir');
        }

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];
    
        if (!extensionesValidas.includes(extension)) {
            return reject( `Las extensiones validas son ${ extensionesValidas }`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
        
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
    
            resolve( nombreTemp );
        });
    })
}


module.exports = {
    subirArchivo
}