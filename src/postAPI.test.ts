import { expect, test, describe } from 'vitest';
import axios from 'axios';

let testUrl = 'https://dummyjson.com/auth/';
let data: any;
// let body:any;
describe('Post api tests from dummyjson', async () => {
    let response: any;
    const postUrl = testUrl+'login';
    response = await axios.post(postUrl, {
        username: 'ggude7',
        password: 'MWwlaeWcOoF6',
    })
    data = response.data
    test('response status should be 200', () => {
        // console.log(response.status)
        expect(response.status).toBe(200);
        console.log(response.data)
    })
    test('Id should not be greather than 100', () => {
        expect(data.id).toBeLessThanOrEqual(100)
    })
    test.fails('Id should not be Nan', () => {
        expect(data.id).toBeNaN()
    })
})

describe('Get API Tests after login', async () => {
    let response: any;
    const getUrl =testUrl+ 'me'
    response = await axios.get(testUrl, {
        headers: { 'Authorization': `Bearer ${data.token}` }
    })
    const newData = response.data
    //Status code shold be success
    test('Run test request get success', () => {
        expect(response.status).toBe(200)
    })

    //Headers should not be null
    test.fails('Id should not be multiple',()=>{
        expect(response.headers).toBeNull()
    })

    //Date of fetching time should not be null
    test.fails('Fetching time should not be null',()=>{
        expect(response.headers.date).toBeNull();
    })
    
    //There should be a GET method 
    test('Get method must need when fetching data',()=>{
        expect(response.config.method).toBe('get')
    })

    //Test fails is data did not have token
    test.fails('Test fails if token not have',()=>{
        expect(data.token).toBeNull()
    })
})