import { test, expect } from '@playwright/test';

let authToken: string;

test.beforeAll('Creation of Authorization token', async({request})=>{
    const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { "user": { "email": "sandeep@yopmail.com", "password": "sandeep@1984" } }
  });
  const tokenResponseJson = await tokenResponse.json();
  authToken = 'Token '+ tokenResponseJson.user.token

})

test('Verify GET Tags', async ({ request }) => {
  
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsResponseJson = await tagsResponse.json();
  expect(tagsResponse.status()).toEqual(200);
  expect(tagsResponseJson.tags[0]).toEqual('Test');
  expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10);
  //console.log(tagsResponseJson);


});

test('Verify GET all Articles', async({request})=>{
  const getArticleResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const getArticleResponseJson = await getArticleResponse.json();
  expect(getArticleResponse.status()).toEqual(200);
  expect(getArticleResponseJson.articles.length).toBeLessThanOrEqual(10);
  expect(getArticleResponseJson.articlesCount).toBeLessThanOrEqual(10);
  //console.log(getArticleResponseJson);
})

test('Verify POST API', async ({ request }) => {
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title": "testing sandeep article two",
        "description": "testing two",
        "body": "testing two",
        "tagList": [
          "testingsandeeptagtwo"
        ]
      }
    },
    headers:{
      Authorization: authToken
    }
  
  })

  const newArticleResponseJSON = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual('testing sandeep article two');
  //console.log(newArticleResponseJSON);

  const slugId = newArticleResponseJSON.article.slug;

  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`,{
    data:{
    "article": {
        "title": "testing sandeep article newly updated",
        "description": "testing new update one",
        "body": "testing updated",
        "tagList": [
            "testingsandeeptagone updated"
        ]
    }
},headers:{
  Authorization: authToken
}
  })

  const updateArticleResponseJson = await updateArticleResponse.json();
  expect(updateArticleResponse.status()).toEqual(200)
  const newSlugId = updateArticleResponseJson.article.slug;



  const articleResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',{
    headers:{
      Authorization: authToken
    }
  });
  const articleResponseJSON = await articleResponse.json();
  expect(articleResponse.status()).toEqual(200);
  expect(articleResponseJSON.articles[0].title).toEqual('testing sandeep article newly updated')

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`,{
    headers:{
      Authorization: authToken
    }
  })

  expect(deleteArticleResponse.status()).toEqual(204)
})