# Product Filter Utility #
Dynamically generated product filters for online shopping sites of all types.

What problem or need does your project solve?

- Online shopping sites sometimes have problems with filtering. For example, on all Nordstrom category pages, four filters are shown: Size, Color, Price, and Brand. However, for many categories of item, these categories are not relevant or not informative. For example, when I am shopping in the Home category, the Size filter usually only has "OS" (one size) which is pretty useless if I'm looking for a throw pillow or an accent chair. What if these filters were populated dynamically from a JSON file containing the types of filters to display on a category or event page? I will create a tool that will read in a JSON file and dynamically append these filter categories to a page. I will make several of these files to demonstrate the flexibility and utility of the tool.
Additionally, I will use local storage to retain a user's filter information. Currently, when you move on to a different category of item, that size is not retained when you go back to it. For example, if I search for women's jeans for myself, then o look for men's jeans for my partner, then go back to women's jeans, I would like the size filter to persist within a single session and across sessions. A user can remove this information easily by un-checking the filter. (This info could also be sent back to the server & stored for better user behavior tracking! I.e. if there is a closeout event and my favorite brand/size of jeans is included, I would love to have an email notification. )

Who would be a user of your website?

- Anyone who shops online would probably like more usable and helpful filtering. In particular people who shop for fashion, home goods, or similar items online would find this useful.

What technologies will you be using?

- HTML, CSS, JS, JSON, event handling, DOM manipulation, local storage, JS object manipulation, and likely others.