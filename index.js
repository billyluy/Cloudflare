addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  try{
    let url = 'https://cfw-takehome.developers.workers.dev/api/variants';
    let response = await fetch(url);
    let json = await response.json();
    let variants = json.variants;
    console.log(variants);
  
    var pageRes;
    // const NAME = 'a/b';
    const A = await fetch(variants[0]);
    const B = await fetch(variants[1]);
    const cookie = request.headers.get('cookie');
  
    if(cookie && cookie.includes(`${NAME}=a`)){
      pageRes = A
    }else if (cookie && cookie.includes(`${NAME}=b`)){
      pageRes = B;
    }else{
      let cookie = Math.random() < 0.5 ? 'a' : 'b';
      pageRes = cookie === 'a' ? A : B; 
      pageRes = new Response(pageRes.body, pageRes);
      pageRes.headers.append('Set-Cookie', '${NAME}=${cookie}');
    }
    return rewriter.transform(pageRes);
  }catch (e){
    console.error(e);
  }
  
}

const rewriter = new HTMLRewriter()
.on('title', {
  element(element){ 
    element.setInnerContent('CloudFlare Fullstack Internship Challenge');
  },
})
.on('h1#title', {
  element(element) {
    element.setInnerContent('Welcome to my challenge');
  },
})
.on('p#description', {
  element(element) {
    element.setInnerContent('Visit my LinkedIn');
  },
})
.on('a#url', {
  element(element) {
    element.setInnerContent('Click Me');
    element.setAttribute('href', 'https://www.linkedin.com/in/billy-luy/');
  },
})