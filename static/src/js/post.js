window.addEventListener( 'load', function () {
    getPost ();
    window.removeEventListener( 'load', getPost );
} );

function getPost () {
    const postArea = document.getElementsByClassName( 'announcement' );
    const tagNameMap = new Map();

    initTagNameMap();

    fetch ( 'http://localhost:3000/api/announcement/all', { method: 'get', } )
        .then ( function ( response ) {
            if ( !response.ok )
                throw new Error( response.statusText );
            return response.json();
        } )
        .then ( function ( jsonArray ) {
            for( let i = 0; i < jsonArray.length; ++i ) {
                let data = jsonArray[ i ];
                createPost( data.title, data.content, data.time, data.tag );
            }
        } )
        .catch ( function ( error ) {
            console.error( error );
        } );

    function createPost ( title, content, time, tag ) {
        let newPost = document.createElement( 'section' );
        newPost.classList.add( 'post' );

        const newTitle = document.createElement( 'h1' );
        newTitle.classList.add( 'post__title' );
        newTitle.textContent = title;
        newPost.appendChild( newTitle );

        let newTagArea =  document.createElement( 'aside' );
        newTagArea.classList.add( 'tag' );

        for( let i = 0; i < tag.length; ++i ) {
            let newTag = document.createElement( 'button' );
            newTag.classList.add( `tags__tag--${tag[ i ]}` );
            newTag.classList.add( 'tags__tag--radius' );
            newTag.textContent = tagNameMap.get( tag[ i ] );
            newTagArea.appendChild( newTag );
        }
        newPost.appendChild( newTagArea );

        let newContent = document.createElement( 'p' );
        newContent.classList.add( post__article );
        newContent.textContent = content;
        newPost.appendChild( newContent );

        let newTime = document.createElement( 'time' );
        newTime.textContent = time;
        newPost.appendChild( newTime );

        postArea.appendChild( newPost );
    }

    function initTagNameMap () {
        tagNameMap.set( 1, 'college' );
        tagNameMap.set( 2, 'master' );
        tagNameMap.set( 3, 'phd' );
        tagNameMap.set( 4, 'teacher' );
        tagNameMap.set( 5, 'administrator' );
        tagNameMap.set( 6, 'international' );
        tagNameMap.set( 7, 'exhibition' );
        tagNameMap.set( 8, 'speech' );
        tagNameMap.set( 9, 'competition' );
        tagNameMap.set( 10, 'conference' );
        tagNameMap.set( 11, 'internship' );
        tagNameMap.set( 12, 'law' );
        tagNameMap.set( 13, 'recruitment' );
        tagNameMap.set( 14, 'scholarship' );
    }
}
