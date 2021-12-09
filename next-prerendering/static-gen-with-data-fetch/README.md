# Static Generation (SSG)

The HTML is statically generated at build time. The built page is then cached and reused for
each request.

For a dynamic page with getStaticPaths and fallback set to true the page is not generated at
build time but is generated on the initial request.

With **Incremental Static Regeneration (ISR)**, a page can be regenerated for a request after the
revalidation time has elapsed.

For the most part, the pages are generated using getStaticProps when you build the project.

## Problems with Static Generation

**1. We cannot fetch data at request time.**
We can't get data per request and pre-render.

With not being able to fetch data per request, we run into the problem of stale data.

Let's say we are building a news website.

The content is very dynamic in the sense that new articles can be published almost every
second.

**getStaticProps** will fetch the news at build time which is not suitable at all.

**getStaticPaths** will help fetch the data on the initial request but it is then cached
for subsequent requests.

**Incremental Static Regeneration (ISR)** can help but if revalidate is 1 second, we still
might not always see the most up to date news when the regeneration is happening in the
background.

Rather fetch the data on the client side by making a get request from the component, but lost the
benefits of SEO. For news website SEO is very important.

**2. We don't get access to the incoming request.**
We can't fetch data for the user specific and pre-render a page.

Problem when the data that needs to be fetched is specific to a user.

Let's say we are building a website similar to twitter.

As a user, I should be able to see tweets that are personalized based on my interests.

The tweets that I see also need to be SEO friendly as it is public content that anyone
in the world can see.

To fetch tweets specific to the user, we need the userId. And that can be obtained only if have
we access to the incoming request.

You could do it client side in **useEffect** for example but that means you again miss out on SEO.

To solve this problems nextJs offers the second form of pre-rendering which is **Server Side Rendering (SSR)**.
