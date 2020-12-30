# pr230-foodprint

## Project setup
```
npm install
OR
yarn
```

### Compiles and hot-reloads for development
```
npm run serve
OR
yarn serve --port 8080
```

### Compiles and minifies for production
```
npm run build
OR
yarn build
```

### Lints and fixes files
```
npm run lint
```

## Deploy
```
gcloud builds submit --substitutions=_SERVICE_NAME=foodprint,_IMAGE_NAME=foodprint,_REGION=europe-west1
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
mixin