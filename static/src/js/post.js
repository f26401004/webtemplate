window.addEventListener( 'load', function getPost () {
    const postArea = document.getElementsByClassName( 'announcement' )[ 1 ];
    const params = ( new URL( document.location ) ).searchParams;
    const urlTags = params.get( 'tags' );
    const urlLanguage = params.get( 'language' );
    const urlPage = params.get( 'page' );
    $.ajax( {
        url: getUrl( urlTags, urlLanguage, urlPage ),
        type: 'GET',
        contentType: 'application/json',
        success: function ( jsonArray ) {
            console.log( jsonArray.length );
            for( let i = 0; i < jsonArray.length; ++i ) {
                let data = jsonArray[ i ];
                createPost( data.title, data.content, data.time, data.tags );
            }
        },
        error: function ( error ) {
            console.log( error );
        },
    } );

    function getUrl ( tags, language, page ) {
        tags = tags || [];
        language = language || 'ZH-TW';
        page = page || 1;
        return 'http://localhost:3000/api/announcement/getAnnouncementPost?' + ( tags.length != 0 ? 'tags=' + tags.toString() : '' ) +
            ( language != '' ? `&language=${language}` : '' ) + ( page != 0 ? `&page=${page}` : '' );
    }

    function createPost ( title, content, time, tag ) {
        let newPost = document.createElement( 'section' );
        newPost.classList.add( 'post' );
        newPost.classList.add( 'post--announcement' );

        let newTitle = document.createElement( 'h1' );
        newTitle.innerHTML = title;
        newTitle.classList.add( 'post__title' );
        newTitle.classList.add( 'post__title--announcement' );
        newPost.appendChild( newTitle );


        let newTagArea =  document.createElement( 'aside' );
        newTagArea.id = 'tag';
        newTagArea.classList.add( 'tags' );
        newTagArea.classList.add( 'post__tags--announcement' );
        for( let i = 0; i < tag.length; ++i ) {
            let newTag = document.createElement( 'button' );
            newTag.classList.add( `tags__tag--${ tagIdMapping( tag[ i ] ) }` );
            newTag.classList.add( 'tags__tag--radius' );
            newTag.innerHTML = tagNameMapping( tag[ i ] );
            newTagArea.appendChild( newTag );
        }
        newPost.appendChild( newTagArea );

        let newContent = document.createElement( 'p' );
        newContent.innerHTML = content;
        newContent.classList.add( 'post__article' );
        newContent.classList.add( 'post__article--announcement' );
        newPost.appendChild( newContent );

        let newTime = document.createElement( 'time' );
        newTime.innerHTML = time;
        newTime.classList.add( 'post__time' );
        newTime.classList.add( 'post__time--announcement' );


        newPost.appendChild( newTime );


        postArea.appendChild( newPost );
    }

    function tagIdMapping ( tag ) {
        switch( tag ) {
        case 1:
            return 'college';
            break;
        case 2:
            return 'master';
            break;
        case 3:
            return 'phd';
            break;
        case 4:
            return 'practice';
            break;
        case 5:
            return 'internal';
            break;
        case 6:
            return 'recruitment';
            break;
        case 7:
            return 'seminar';
            break;
        case 8:
            return 'faculty';
            break;
        case 9:
            return 'speech';
            break;
        case 10:
            return 'scholarship';
            break;
        case 11:
            return 'exhibition';
            break;
        case 12:
            return 'administrative';
            break;
        case 13:
            return 'law';
            break;
        case 14:
            return 'competition';
            break;
        }
    }
    function tagNameMapping ( tag ) {
        switch( tag ) {
        case 1:
            return '大學部';
            break;
        case 2:
            return '碩士';
            break;
        case 3:
            return '博士';
            break;
        case 4:
            return '實習';
            break;
        case 5:
            return '國際交流';
            break;
        case 6:
            return '徵人';
            break;
        case 7:
            return '研討會';
            break;
        case 8:
            return '教職人員';
            break;
        case 9:
            return '演講';
            break;
        case 10:
            return '獎學金';
            break;
        case 11:
            return '展覽';
            break;
        case 12:
            return '行政人員';
            break;
        case 13:
            return '法規彙編';
            break;
        case 14:
            return '競賽';
            break;
        }
    }

    window.removeEventListener( 'load', getPost );
} );
