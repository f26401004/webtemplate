window.addEventListener( 'load', function addPages () {
    let totalData;
    const params = ( new URL( document.location ) ).searchParams;
    const urlTags = params.get( 'tags' );
    const urlLanguage = params.get( 'language' );
    const urlPage = params.get( 'page' );

    $.ajax( {
        url: getUrl( urlTags, urlLanguage, urlPage ),
        type: 'GET',
        contentType: 'application/json',
        success: function ( number ) {
            totalData = number;
        },
        error: function ( error ) {
            console.log( error );
        },
    } );

    function getUrl ( tags, language, page ) {
        tags = tags || [];
        language = language || 'ZH-TW';
        page = page || 1;
        return 'http://localhost:3000/api/announcement/getAnnouncementPostTotalNumber?' + ( tags.length != 0 ? 'tags=' + tags.toString() : '' ) +
            ( language != '' ? `&language=${language}` : '' );
    }

    const pageData = 12;   // how many data in one page
    const singlePage = 10;   // show x pages in pagination
    const totalPage = Math.ceil( totalData / pageData );
    const pagination = document.getElementById( 'pagination' );

    function createPage ( text, link ) {
        const newLink = document.createElement( 'p' );
        newLink.innerHTML = text;
        newLink.href = link;
        if ( text === '◂ Previous' || text === 'Next ▸' )
            newLink.id = 'sidebutton';


        pagination.appendChild( newLink );
    }

    function createPageActive ( text, link ) {
        const newLink = document.createElement( 'p' );
        newLink.innerHTML = text;
        newLink.href = link;
        newLink.classList.add( 'active' );
        pagination.appendChild( newLink );
    }

    if( totalPage > singlePage ) {    // then show x pages

        // laquo -> add link to first page
        createPage ( '◂ Previous', '#' );

        const center = Math.ceil( singlePage / 2 );   // to judge if u are in the very begin pages or in the end pages
        let beginPages = 0, endPages = 0;   // beginPages=num of pages before and include u. endPages=num of pages after u
        if( urlPage < center ) {    // in the begin pages
            beginPages = urlPage;
            endPages = singlePage - urlPage;
        }else if( urlPage > totalPage - center + 1 ) {   // in the end pages
            endPages = totalPage - urlPage;
            beginPages = singlePage - endPages;
            console.log( beginPages, endPages );
        }else{
            beginPages = center;
            endPages = singlePage - center;
        }

        for( let i = 1; i <= beginPages; ++i ) {    // create pages in part beginPages (include urlPage)
            let page_num = urlPage - beginPages + i;
            if( page_num === urlPage )
                createPageActive ( page_num, '#' );
            else
                createPage ( page_num, '#' );

        }

        for( let i = 1; i <= endPages; ++i ) {  // in part endPages
            let page_num = urlPage + i;
            createPage ( page_num, '#' );
        }

        // raquo -> add link to last page
        createPage ( 'Next ▸', '#', false );

    }else    // then show all the pages
        for( let i = 1; i <= totalPage; ++i )

            // apage.innerHTML = i;
            if( i === urlPage )
                createPageActive ( i, '#' );
            else
                createPage ( i, '#' );


    window.removeEventListener( 'load', addPages );
} );
