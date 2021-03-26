window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.about__tab'),
          tabsContent = document.querySelectorAll('.about__content'),
          tabsParent = document.querySelector('.about__tabs');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('about__tab_active');
        })
    
    }

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'grid';
        tabs[i].classList.add('about__tab_active');
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('about__tab')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    })

    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.overlay'),
          modalCloseBtn = document.querySelector('[data-close]');

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('show');
                modal.classList.remove('hide');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modalCloseBtn.addEventListener('click', closeModal)

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape') {
                closeModal();
            }
        });

        // carousel

        const slides = document.querySelectorAll('.phone__slide'),
              prev = document.querySelector('.phone__arrows-prev'),
              next = document.querySelector('.phone__arrows-next');

        let slideIndex = 1;

        showSlides(slideIndex - 1);

        function showSlides(n) {
            if(n > slides.length) {
                slideIndex = 1;
            }

            if(n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach(item => item.style.display = 'none');
            slides[slideIndex - 1].style.display = 'block';
        }
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        prev.addEventListener('click', () => {
            plusSlides(-1);
        });

        next.addEventListener('click', () => {
            plusSlides(1);
        });    
})