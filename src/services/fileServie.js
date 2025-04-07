const path = require('path');
const uploadSingleFile = async (fileObject) => {

    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (error) {
        return {
            status: 'failed',
            path: finalName,
            error: JSON.stringify(error)
        }
    }
}

const uploadmultipleFile = () => {

}

module.exports = {
    uploadSingleFile,
    uploadmultipleFile
}