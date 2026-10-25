window.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CATEGORY DROPDOWN
    ========================================= */

    const filterIcon = document.querySelector(
        ".showsubcategoryoption"
    );

    const subcategories = document.querySelector(
        ".subcategories"
    );


    if (filterIcon && subcategories) {

        filterIcon.addEventListener("click", (e) => {

            e.stopPropagation();

            if (
                subcategories.style.display === "block"
            ) {

                subcategories.style.display = "none";

            } else {

                subcategories.style.display = "block";

            }

        });


        document.addEventListener("click", (e) => {

            if (
                !e.target.closest(
                    ".showsubcategoryoption"
                ) &&
                !e.target.closest(
                    ".subcategories"
                )
            ) {

                subcategories.style.display = "none";

            }

        });

    }


    /* =========================================
       ACTIVE CATEGORY
    ========================================= */

    function filterActiveToggle() {

        const filtersoption =
            document.querySelectorAll(
                ".filterOption"
            );


        filtersoption.forEach((filterOption) => {

            filterOption.addEventListener(
                "click",
                () => {

                    activeClass(filtersoption);

                    filterOptionClick(
                        filterOption
                    );

                }
            );

        });

    }


    function filterOptionClick(filterOption) {

        filterOption.classList.add("active");

    }


    function activeClass(options) {

        options.forEach((option) => {

            option.classList.remove("active");

        });

    }


    filterActiveToggle();


    /* =========================================
       MASTER PRODUCT SEARCH DROPDOWN
    ========================================= */

    const searchInput =
        document.getElementById(
            "searchproduct"
        );

    const productDropdown =
        document.getElementById(
            "masterProductDropdown"
        );

    const productOptions =
        document.querySelectorAll(
            ".master-product-option"
        );


    if (
        searchInput &&
        productDropdown
    ) {


        /* -----------------------------------------
           SHOW DROPDOWN
        ----------------------------------------- */

        function showProductDropdown() {

            productDropdown.classList.add(
                "show"
            );

        }


        /* -----------------------------------------
           HIDE DROPDOWN
        ----------------------------------------- */

        function hideProductDropdown() {

            productDropdown.classList.remove(
                "show"
            );

        }


        /* -----------------------------------------
           FILTER PRODUCTS
        ----------------------------------------- */

        function filterProducts() {

            const searchValue =
                searchInput.value
                    .trim()
                    .toLowerCase();


            let visibleProducts = 0;


            productOptions.forEach((option) => {

                const productName =
                    (
                        option.dataset.productName ||
                        ""
                    ).toLowerCase();


                if (
                    productName.includes(
                        searchValue
                    )
                ) {

                    option.style.display =
                        "flex";

                    visibleProducts++;

                } else {

                    option.style.display =
                        "none";

                }

            });


            /* -----------------------------------------
               NO RESULT
            ----------------------------------------- */

            let noResult =
                productDropdown.querySelector(
                    ".master-search-no-result"
                );


            if (
                visibleProducts === 0 &&
                productOptions.length > 0
            ) {

                if (!noResult) {

                    noResult =
                        document.createElement(
                            "div"
                        );

                    noResult.className =
                        "master-search-no-result";

                    noResult.textContent =
                        "No matching product found.";

                    productDropdown.appendChild(
                        noResult
                    );

                }

            } else {

                if (noResult) {

                    noResult.remove();

                }

            }

        }


        /* -----------------------------------------
           INPUT EVENT
        ----------------------------------------- */

        searchInput.addEventListener(
            "input",
            () => {

                filterProducts();

                showProductDropdown();

            }
        );


        /* -----------------------------------------
           FOCUS
        ----------------------------------------- */

        searchInput.addEventListener(
            "focus",
            () => {

                filterProducts();

                showProductDropdown();

            }
        );


        /* -----------------------------------------
           PRODUCT SELECT
        ----------------------------------------- */

        productOptions.forEach((option) => {

            option.addEventListener(
                "click",
                () => {

                    const productName =
                        option.dataset.productName;


                    searchInput.value =
                        productName;


                    hideProductDropdown();


                    /*
                     * Automatically submit search
                     * after selecting product.
                     */

                    const form =
                        searchInput.closest(
                            "form"
                        );


                    if (form) {

                        form.submit();

                    }

                }
            );

        });


        /* -----------------------------------------
           CLICK OUTSIDE
        ----------------------------------------- */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !event.target.closest(
                        ".master-search-wrapper"
                    )
                ) {

                    hideProductDropdown();

                }

            }
        );

    }


    /* =========================================
       ADD TO STORE BUTTON
    ========================================= */

    const addForms =
        document.querySelectorAll(
            ".add-master-product-form"
        );


    addForms.forEach((form) => {

        form.addEventListener(
            "submit",
            () => {

                const button =
                    form.querySelector(
                        ".addproduct"
                    );


                if (button) {

                    button.disabled = true;

                    button.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';

                }

            }
        );

    });


    /* =========================================
       CLOSE SUCCESS / ERROR MESSAGE
    ========================================= */

    const errorContainers =
        document.querySelectorAll(
            ".errorContainer"
        );


    errorContainers.forEach((container) => {

        const closeButton =
            container.querySelector(
                ".crossError"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    container.remove();

                }
            );

        }

    });

});