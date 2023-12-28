+++
title = 'Mon Premier Article'
date = 2023-12-25T00:16:45+01:00
draft = false
+++

# Features

- Multilingual.
- Dark and light mode.
- Clean, no external JavaScript, stylesheets or Google fonts.
- Supports Indieweb.
- Simple and minimalistic, ultra-fast.
- Has webmentions.
- Syntax highlighting.
- Has mobile menu support and lightbox.

# Usage

Configure your `config.toml`. Feel free to copy the demo `config.toml` and some content from the `exampleSite` folder. Build your site with `hugo serve` and enjoy the result at [http://localhost:1313](http://localhost:1313).

Make sure you replace all occurrences of `sizeof.cat` with your website address (or [http://localhost:1313/](http://localhost:1313/)).

# Configuration

Just look into the `config.toml` file, there are way too many configuration options to list them all here.

# Notes

- All the dates are normalized to UTC. If you don’t want that, look into archetypes/*.md files (though you might want not to expose your timezone).
- The server-side encryption is not public and will never be. Don’t ask.
- All the static files are in the static directory and you will need to manually cleanup it; I left the files there so you can figure out the site structure.
- Section indexes are disabled for music, review and photo sections.
- The HTML files might look funny because of the SVG images but keep in mind that text can be easily compressed by the web server.
- There are probably lots of unused options and files around, the archive is exported via an automatic deploy script and it’s up to you to decide what files to keep and what not.
- If you’re stuck, contact me, I’m always happy to help.

# License
