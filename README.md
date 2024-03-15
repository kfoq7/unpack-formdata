# Unpack FormData API

## Installation

Avaible for Node.

### npm, yarn and pnpm

```bash
npm install unpack-formdata
```

```bash
yarn add unpack-formdata
```

```bash
pnpm add unpack-formdata
```

### Import

```ts
import { unpack } from 'unpack-formdata'
```

## How to use

You can easily set the keys from your object in the name attribute in your form.

```html
<form method="POST">
  <input name="name" type="text" />
  <input name="price" type="number" />
  <input name="available" type="checkbox" />

  <input name="release_date" type="date" />

  <input name="categories.0" type="text" />
  <input name="categories.1" type="text" />
  <input name="categories.2" type="text" />

  <input name="images.0.title" type="text" />
  <input name="images.0.created" type="date" />
  <input name="images.0.file" type="file" />
  <input name="images.1.title" type="text" />
  <input name="images.2.created" type="date" />
  <input name="images.3.file" type="file" />
</form>
```

```ts
import { unpack } from 'unpack-formdata'

function postData(formData: FormData) {
  const product = unpack(formData, {
    fieldTypes: {
      numbers: 'price'
      booleans: 'available'
      dates: ['release_date', 'images.$.created']
    }
  })

  const response = await fetch('https://api.testserver.com/api/product', {
    method: 'POST',
    body: JSON.stringify(product)
    // Other options
    ...
  })

 // Continue handling your response
  ...
}
```

Object Result after unpack data

```ts
const product = {
  name: 'Mandarin',
  price: 4.5,
  available: true,
  release_date: Date,
  categories: ['fruit', 'organic', 'healthy'],
  images: [
    {
      name: 'Promo Mandarin Product'
      created: Date,
      file: Blob
    },
    {
      name: 'Mandarins are incredible'
      created: Date,
      file: Blob
    },
  ]
}
```

Also can extend object return type with interface

```ts
interface ImageFruit {
  name: string
  created: Date
  file: File
}

interface Fruit {
  name: string
  price: number
  available: boolean
  release_date: Date
  categories: string[]
  images: ImageFruit[]
}

const fruit = unpack<Fruit>(formData)
```

#### Idea based on [fabian-hiller/decode-formdata](https://github.com/fabian-hiller/decode-formdata)
