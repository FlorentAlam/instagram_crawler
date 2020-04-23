import InstaCrawler from './crawler.js';

async function createCrawler(){
    const crawler = new InstaCrawler();
    await crawler.fetchUserDatas("marshallheadphones")
    const medias = crawler.medias;
}
createCrawler();
