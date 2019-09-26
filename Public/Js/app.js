const weatherForm = document.querySelector('form')   
const search = document.querySelector('input')
const p1 =document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = search.value    

    if (location.length === 0){
        return p1.textContent = 'Enter search location '
    }
    
    p1.textContent = 'Loading Message'
    p2.textContent = ' '

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                p1.textContent = (data.error)             // was console.log changed it to be printed on the browser
                p2.textContent = ''
            }else{
                p1.textContent = (data.location)
                p2.textContent = (data.forecast)
            }
        })
    }) 
           


})