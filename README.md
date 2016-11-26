# FlexibleBreakpoints
A flexible SCSS mixin to generate Media Quiries easily and effeciently.

##Instillation:

Can be installed through NPM:
Add to your package.json:

```
"dependencies": {
  "flexible-breakpoints": "git+ssh://github.com/CodyReeves/FlexibleBreakpoints.git"
},
```

Add to your SCSS:
```
@import "PATH-TO-NODE_MODULES/node_modules/flexible-breakpoints/scss/main";
```

#Usage:

```
@include breakpoint($queries, $type, $query-fallback, $breakpoints) {

}

```

##Explained

`$queries` => List of arguments for queries written like  `max-width 500px max-height 1200px`
              NOTE: This must be written in list without commas.
              NOTE: First argument => query property, Second argument=> value for query.

`$type` => Type of query for example `screen` or `all`.

`$query-fallback` => If you would like to set a fallback, Default value: `null`, Exports to css like:
```
#{$query-fallback} & {
  @content;
}
```
$breakpoints => Sets what breakpoint map to use, Default value: `$breakpoints`. See Default Variables for more info.

##Regular Usage

```

@include breakpoint(max-width 1200px min-width 400px) {
    margin: 7px;
}


```

###Available Queries:

- Any CSS Media Query
- Preset Queries: width, height

####Width
Width accepts 2 values in one argument:
- First value sets the min-width
- Second value sets the max-width
- NOTE: Can be use in conjunction with other quires when setting breakpoint

```
@include breakpoint(width 300px 750px) {

}

Will export to:

@media all (min-width: 300px) and (max-width: 750px) {

}
```
or
```
@include breakpoint(width 300px 750px min-height 250px) {

}

Will export to:

@media all (min-width: 300px) and (max-width: 750px) and (min-height: 250px) {

}
```

####Height
Height accepts 2 values in one argument:
- First value sets the min-height
- Second value sets the max-height
- NOTE: Can be use in conjunction with other quires when setting breakpoint
```
@include breakpoint(height 300px 750px) {

}

Will export to:

@media all (min-height: 300px) and (max-height: 750px) {

}
```
or
```
@include breakpoint(height 300px 750px min-width 250px) {

}

Will export to:

@media all (min-height: 300px) and (max-height: 750px) and (min-width: 250px) {

}

```

##Default Variables

###Sets Breakpoint screen values
```
$xs: 1px !default;
$sm: 768px !default;
$md: 992px !default;
$lg: 1280px !default;
$xl: 1600px !default;
```

###Sets Breakpoint queries
```
$media-query-xs: max-width $sm !default;
$media-query-sm: sm !default;
$media-query-md: md !default;
$media-query-lg: lg !default;
$media-query-xl: xl !default;
```

The queries set here will create a min-width automatically.
Please note these cannot be combined with other queries within the same argument
####Usage
```
@include breakpoint(sm) {

}

Will Export To:

@media (min-width: 768px) {

}
```
