const download = document.querySelector('.download')
const dark = document.querySelector('.dark')
const light = document.querySelector('.light')
const qrContainer = document.querySelector('#qr-code')
const qrText = document.querySelector('.qr-text')
const shareBtn = document.querySelector('.btn-share')
const sizes = document.querySelector('.sizes')

const defaultUrl = "https://google.com"
let colorLight = "#fff", colorDark = "#000", text = defaultUrl, size = 200

document.addEventListener('click', e=>{
    if(e.target.className == shareBtn.className){
        setTimeout(async () => {
            try{
                const base64Url = await resolveDataUrl()
                const blob = await(await fetch(base64Url)).blob()
                const file = new File([blob], "QRCode.png", {
                    type: blob.type
                })
                await navigator.share({
                    files: [file],
                    title: text
                })
            } catch (error){
                alert("Your browser doesn't support this sharing")
            }
        }, 100)
    }

})

document.addEventListener('input', e=>{
    if(e.target.className == light.className ){
        colorLight = e.target.value
        generateQRCode()
    }

    if(e.target.className == dark.className){
        colorDark = e.target.value
        generateQRCode()
    }

    if(e.target.className == qrText.className){
        value = e.target.value
        text = value
        if(!value) text = defaultUrl
        generateQRCode()
    }
})

document.addEventListener('change', e=>{
    if(e.target.className == sizes.className){
        size = e.target.value / 2
        generateQRCode()
    }
})

async function generateQRCode(){
    qrContainer.innerHTML = ""
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark
    })
    download.href = await resolveDataUrl()
}

function resolveDataUrl(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img")
            if(img.currentSrc){
                resolve(img.currentSrc)
                return
            }
            const canvas = document.querySelector("canvas")
            resolve(canvas.toDataURL())
        }, 50)
    })
}
generateQRCode()