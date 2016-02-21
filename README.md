## Swagger UI Themes
---
*Version 1.0.0*

A set of themes for Swagger UI:

- Read The Docs

You can find the Swagger UI project on GitHub [here](https://github.com/swagger-api/swagger-ui).

## Getting started

Download the swagger-ui-themes project and place the desired stylesheet into the source of your swagger-ui html.

In the `<head>` of your html, reference the location to your [theme].css

Make sure to either remove/comment out the link to `screen.css` or load the desired theme after to override the default Swagger UI styles.

```html
<link rel="stylesheet" href="path/to/theme-rtd.css">
```
#### Install with Bower

```shell
$ bower install opw-swagger-ui-themes
```


## Themes

#### Read The Docs
![Read The Doce Screenshot](https://github.com/petervandenhout/swagger-ui-themes/screenshots/flattop.png)

## Contributing

If you want to add theme ideas or other fixes/changes to how the package works, feel free to submit an issue.

## License

- Code licensed under [MIT License](https://github.com/petervandenhout/swagger-ui-themes/LICENSE)
