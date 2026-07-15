import { expect, test } from '../utils/fixtures';


let authToken: string;

test.beforeAll('Creation of Authorization token', async ({ api, config }) => {
    const tokenResponse = await api
        .path('/users/login')
        .body({ "user": { "email": config.userEmail, "password": config.userPassword } })
        .postRequest(200)
    authToken = 'Token ' + tokenResponse.user.token

})


test('GET API - Get Articles', async ({ api }) => {

    const response = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(response.articles.length).shouldBeLessThanOrEqual(10);
    expect(response.articlesCount).shouldEqual(10);

})

test('GET API - Get Tags', async ({ api }) => {

    const response = await api
        .path('/tags')
        .getRequest(200)

    expect(response.tags[0]).shouldEqual('Test');
    expect(response.tags.length).shouldBeLessThanOrEqual(10);
})

test('Create and Delete Article', async ({ api }) => {
    const createArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .body({
            "article": {
                "title": "testing sandeep article two",
                "description": "testing two",
                "body": "testing two",
                "tagList": ["testingsandeeptagtwo"]
            }
        })
        .postRequest(201)
    expect(createArticleResponse.article.title).shouldEqual('testing sandeep article two');
    const slugId = createArticleResponse.article.slug

    const articleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(articleResponse.articles[0].title).shouldEqual('testing sandeep article two')

    await api
        .path(`/articles/${slugId}`)
        .headers({
            Authorization: authToken
        })
        .deleteRequest(204)

    const deleteArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(deleteArticleResponse.articles[0].title).not.shouldEqual('testing sandeep article two')
})

test('Create, update and Delete Article', async ({ api }) => {
    const createArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .body({
            "article": {
                "title": "testing new sandeep article two",
                "description": "testing two",
                "body": "testing two",
                "tagList": ["testingsandeeptagtwo"]
            }
        })
        .postRequest(201)
    expect(createArticleResponse.article.title).shouldEqual('testing new sandeep article two');
    const slugId = createArticleResponse.article.slug

    const updateArticleRespnse = await api
        .path(`/articles/${slugId}`)
        .headers({ Authorization: authToken })
        .body({
            "article": {
                "title": "testing new updated sandeep article two",
                "description": "testing updated two",
                "body": "testing updated two",
                "tagList": ["testingsandeeptagtwoupdated"]
            }
        })
        .putRequest(200)
    const newSlugId = updateArticleRespnse.article.slug;
    expect(updateArticleRespnse.article.title).shouldEqual('testing new updated sandeep article two');

    const articleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(articleResponse.articles[0].title).shouldEqual('testing new updated sandeep article two')

    await api
        .path(`/articles/${newSlugId}`)
        .headers({
            Authorization: authToken
        })
        .deleteRequest(204)

    const deleteArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(deleteArticleResponse.articles[0].title).not.shouldEqual('testing new updated sandeep article two')
})