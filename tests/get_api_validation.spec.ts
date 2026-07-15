import { test, expect } from '@playwright/test';

test('Verify GET Tags', async ({ request }) => {
  
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsResponseJson = await tagsResponse.json();
  expect(tagsResponse.status()).toEqual(200);
  expect(tagsResponseJson.tags[0]).toEqual('Test');
  expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10);
  console.log(tagsResponseJson);


});

test('Verify GET all Articles', async({request})=>{
  const getArticleResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const getArticleResponseJson = await getArticleResponse.json();
  expect(getArticleResponse.status()).toEqual(200);
  expect(getArticleResponseJson.articles.length).toBeLessThanOrEqual(10);
  expect(getArticleResponseJson.articlesCount).toBeLessThanOrEqual(10);
  console.log(getArticleResponseJson);
})
