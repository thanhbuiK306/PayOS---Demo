const API_EBOOK = 'http://localhost:6020/api/ebook'
async function getEbookList() {
  // You can uncomment the fetch logic once you're ready to use it
  const response = await fetch(API_EBOOK);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getEbook(id){
    const response = await fetch(`${API_EBOOK}/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
      }
    const data = await response.json();
    return data;
}


module.exports = {
  getEbookList,
  getEbook,
}