window.addEventListener('DOMContentLoaded',()=>{
    let stars= document.querySelectorAll('.starsreview i')
    const review = document.querySelector('#starratingvalue')
    stars.forEach((star)=>{
        star.addEventListener('click',(e)=>{
            let dataId = e.target.getAttribute('data-id')
            fillStars(dataId)
            review.value= dataId
        })
    })

    //show category text
    const showCategory = document.querySelector('.showCategory')
    const filterSection = document.querySelector('#categoryFilter')

    //showing category
    showCategory.addEventListener('click',()=>{
        filterSection.style.display="block"
    })

    //hiding category list
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".showCategory") && !e.target.closest("#categoryFilter")) {
            filterSection.style.display = "none";
        }
    });

    function fillStars(dataValue){
        let stars= document.querySelectorAll('.starsreview i')
        stars.forEach(star=>{
            if(star.getAttribute('data-id')<= dataValue){
                star.className="fa-solid fa-star"
            }else{
                star.className="fa-regular fa-star"
            }  
        })  
    }
})

