<div align="center">
    <h1>Never Bland Frontend Role TechTest</h1>
</div>

<br />

## Packages Installed 🛠

- **[Next JS](https://nextjs.org/)**
- **[React](https://reactjs.org/)**
- **[Tailwind](https://tailwindcss.com/)**
- **[Styled Components](https://styled-components.com/)**
- [React Icons](https://react-icons.github.io/react-icons/)
- [Next SEO](https://github.com/garmeeh/next-seo)

## Instructions to Run 📥

- **WIth NPM**

```bash
npm i
```

then >

```bash
npm dev
```

- **With YARN**

```bash
yarn 
```

then

```bash
yarn dev
```

## Approach  📥

First thing I did was convert the sketch files into Figma files as thats my go to design tool. I can email them if you find it useful for future tech tests.

I broke down the wireframes into components (in a notepad) just to be aware of what I needed to build

Built all the components and then composed them together.

For the 'more details' view, I opted for a popout modal rather than going with a page route. If this was an extended app, I would have went the page route, perhaps still using the modal just to make it abit more interesting but using the url to populate any queries to be fetched on serverside, thus allowing sharable links. I thought it may be overkill for this task & being aware of time, I left it out.

I used framer-motion for most animations but for the header colour gradient animation, I had to go with CSS in a styled-component.

If I were to make more time to make additions I probably would have done a design based on the wireframes. I also would have done a few more micro-interactions changes just to spruce things up abit. Like a nice stagger effect when the search results pop up etc. things like that.

I also used Zod to create API schemas from the API requests.

## What I May Have Done Differently  📥

- More E2E Testing
- Page Routing instead of Modal Popup
- More Micro-Interactions
- Planned Design in Figma

<!-- insert image -->
![screenshot 1](https://i.ibb.co/smDCzn4/Screenshot-2023-10-31-at-22-41-45.png)
