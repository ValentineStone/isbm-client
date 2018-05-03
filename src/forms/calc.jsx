import embroideryForm from '/forms/embroidery.form.jsx'

export default <form>
  <select name="calcType" label="Product type" default="embroidery" options={{
    embroidery: 'Embroidery',
    custom: 'Custom'
  }} />
  {value => {
    switch (value.calcType) {
      case 'embroidery':
        return (
          <form name="product">
            {embroideryForm}
          </form>
        )
      default:
        return <input name="product" label="Custom" />
    }
  }}
</form>