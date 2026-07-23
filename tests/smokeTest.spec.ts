import { createToken } from '../helpers/createToken';
import { expect, test } from '../utils/fixtures';
import { validateSchema } from '../utils/schema-validator';
import articleRequestPayload from '../request-objects/POST-article.json';
import { faker } from '@faker-js/faker';
import { getNewRandomArticle } from '../utils/data-generator';


test('GET API - Get Articles', async ({ api }) => {

    const response = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    await expect(response).shouldMatchSchema('articles', 'GET_articles', true)
    expect(response.articles.length).shouldBeLessThanOrEqual(10);
    expect(response.articlesCount).shouldEqual(10);

})

test('GET API - Get Tags', async ({ api }) => {

    const response = await api
        .path('/tags')
        .getRequest(200)
    await expect(response).shouldMatchSchema('tags', 'GET_tags', true)
    expect(response.tags[0]).shouldEqual('Test');
    expect(response.tags.length).shouldBeLessThanOrEqual(10);
})

test('Create and Delete Article', async ({ api }) => {
    
    const articleRequest = getNewRandomArticle()
    const createArticleResponse = await api
        .path('/articles')
        .body(articleRequest)
        .postRequest(201)
    await expect(createArticleResponse).shouldMatchSchema('articles', 'POST_articles', true)
    expect(createArticleResponse.article.title).shouldEqual(articleRequest.article.title);
    const slugId = createArticleResponse.article.slug

    const articleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(articleResponse.articles[0].title).shouldEqual(articleRequest.article.title)

    await api
        .path(`/articles/${slugId}`)
        .deleteRequest(204)

    const deleteArticleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(deleteArticleResponse.articles[0].title).not.shouldEqual(articleRequest.article.title)
})

test('Create, update and Delete Article', async ({ api }) => {
    const articleTitle = faker.lorem.sentence(5)
    const articleRequest = JSON.parse(JSON.stringify(articleRequestPayload))
    articleRequest.article.title = articleTitle
    const createArticleResponse = await api
        .path('/articles')
        .body(articleRequest)
        .postRequest(201)
    await expect(createArticleResponse).shouldMatchSchema('articles', 'POST_articles', true)
    expect(createArticleResponse.article.title).shouldEqual(articleTitle);
    const slugId = createArticleResponse.article.slug

    const articleTitleTwo = faker.lorem.sentence(5)
    articleRequest.article.title = articleTitleTwo
    const updateArticleRespnse = await api
        .path(`/articles/${slugId}`)
        .body(articleRequest)
        .putRequest(200)
    await expect(createArticleResponse).shouldMatchSchema('articles', 'PUT_articles', true)
    const newSlugId = updateArticleRespnse.article.slug;
    expect(updateArticleRespnse.article.title).shouldEqual(articleTitleTwo);

    const articleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(articleResponse.articles[0].title).shouldEqual(articleTitleTwo)

    await api
        .path(`/articles/${newSlugId}`)
        .deleteRequest(204)

    const deleteArticleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)

    expect(deleteArticleResponse.articles[0].title).not.shouldEqual(articleTitleTwo)
})