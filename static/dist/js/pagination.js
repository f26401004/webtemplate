window.addEventListener("load" , function addPages () {
    const totalData = window.config.totalNumber;
    const pageData = 12;   // how many data in one page
    const singlePage = 10;   // show x pages in pagination
    const totalPage = Math.ceil(totalData/pageData);
    const nowPage = window.config.currentPage;   // you are now in this page
    const pagination = document.getElementById( "pagination" );

    function createPage ( text, link) {
        const newLink = document.createElement( "p" );
        newLink.innerHTML = text;
        newLink.href = link;
        if (text === "◂ Previous" || text === "Next ▸") {
            newLink.id = "sidebutton";
        }

        pagination.appendChild( newLink );
    }

    function createPageActive ( text, link) {
        const newLink = document.createElement( "p" );
        newLink.innerHTML = text;
        newLink.href = link;
        newLink.classList.add('active');
        pagination.appendChild( newLink );
    }

    if( totalPage > singlePage ){    //then show x pages

        // laquo -> add link to first page
        createPage ( "◂ Previous", "#");

        const center = Math.ceil( singlePage/2 );   // to judge if u are in the very begin pages or in the end pages
        let beginPages = 0, endPages = 0;   // beginPages=num of pages before and include u. endPages=num of pages after u
        if( nowPage < center ){    // in the begin pages
            beginPages = nowPage;
            endPages = singlePage-nowPage;
        }else if( nowPage > totalPage - center + 1 ){   // in the end pages
            endPages = totalPage - nowPage;
            beginPages = singlePage - endPages;
            console.log( beginPages, endPages );
        }else{
            beginPages = center;
            endPages = singlePage-center;
        }

        for( let i = 1; i <= beginPages; ++i ){    // create pages in part beginPages (include nowPage)
            let page_num = nowPage - beginPages + i;
            if( page_num === nowPage ){
                createPageActive ( page_num, "#");
            }else{
                createPage ( page_num, "#");
            }
        }

        for( let i = 1; i <= endPages; ++i ){  // in part endPages
            let page_num = nowPage + i;
            createPage ( page_num, "#");
        }

        // raquo -> add link to last page
        createPage ( "Next ▸", "#" ,false );

    }else{    // then show all the pages
        for( let i = 1; i <= totalPage; ++i ){
            //apage.innerHTML = i;
            if( i === nowPage ){
                createPageActive ( i, "#");
            }else{
                createPage ( i, "#");
            }
        }
    }
    window.removeEventListener("load", addPages);
} )
