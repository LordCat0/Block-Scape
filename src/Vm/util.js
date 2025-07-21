class Util{
    constructor(){
    }
    download(blob, download){
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = download
        a.click()
        a.remove()
    }
    openFile(fileExt){
        return new Promise((res, rej) => {
            const reader = new FileReader()
            const i = document.createElement('input')
            i.type = 'file'
            i.accept = fileExt
            reader.onload = function(e){res(e.target.result)}
            reader.onerror = function(e){rej(e)}
            i.addEventListener('change', (event) => {
                reader.readAsArrayBuffer(event.target.files[0])
            })
            i.click()
        })
    }
}

export default Util