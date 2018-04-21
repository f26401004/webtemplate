window.addEventListener("load", function getPost() {
    const postArea = document.getElementById("postarea");
    $.ajax({
        url: "http://localhost:3000/api/announcement/all",
        type: "GET",
        contentType: 'application/json',
        success: function(jsonArray) {
            console.log(jsonArray[0].title);
            for( let i = 0 ; i < jsonArray.length ; ++i)
            {
                let data = jsonArray[i]
                createPost(data.title, data.content, data.time, data.tag);
            }
        },
        error: function(error) {
        }
    });

    function createPost(title, content, time, tag) {
        let newPost = document.createElement("div");
        newPost.id = "post";

        let newTitle = document.createElement("p");
        newTitle.innerHTML = title;

        let newContent = document.createElement("p");
        newContent.innerHTML = content;

        let newTime = document.createElement("p");
        newTime.innerHTML = time;

        newPost.appendChild(newTitle);
        newPost.appendChild(newContent);
        newPost.appendChild(newTime);

        let newTagArea =  document.createElement("div");
        newTagArea.id = "tag";

        for(let i = 0 ; i < tag.length ; ++i) {
            let newTag = document.createElement("a");
            newTag.id = tagIdMapping(tag[i]);
            newTag.innerHTML = tagNameMapping(tag[i]);
            newTagArea.appendChild(newTag);
        }
        newPost.appendChild(newTagArea);

        postArea.appendChild(newPost);
    }

    function tagIdMapping(tag)
    {
        switch(tag) {
            case 1:
                return "college";
                break;
            case 2:
                return "master"
                    break;
            case 3:
                return "phd"
                    break;
            case 4:
                return "practice"
                    break;
            case 5:
                return "internal"
                    break;
            case 6:
                return "recruitment"
                    break;
            case 7:
                return "seminar"
                    break;
            case 8:
                return "faculty"
                    break;
            case 9:
                return "speech"
                    break;
            case 10:
                return "scholarship"
                    break;
            case 11:
                return "exhibition"
                    break;
            case 12:
                return "administrative"
                    break;
            case 13:
                return "law"
                    break;
            case 14:
                return "competition"
                    break;
        }
    }
    function tagNameMapping(tag)
    {
        switch(tag) {
            case 1:
                return "大學部";
                break;
            case 2:
                return "碩士"
                    break;
            case 3:
                return "博士"
                    break;
            case 4:
                return "實習"
                    break;
            case 5:
                return "國際交流"
                    break;
            case 6:
                return "徵人"
                    break;
            case 7:
                return "研討會"
                    break;
            case 8:
                return "教職人員"
                    break;
            case 9:
                return "演講"
                    break;
            case 10:
                return "獎學金"
                    break;
            case 11:
                return "展覽"
                    break;
            case 12:
                return "行政人員"
                    break;
            case 13:
                return "法規彙編"
                    break;
            case 14:
                return "競賽"
                    break;
        }
    }

    window.removeEventListener("load", getPost);
})
