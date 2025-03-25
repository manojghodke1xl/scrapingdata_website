import FormField from './InputField';

const CurrencyInputGroup = ({ currency, price, onPriceChange, salePrice, onSalePriceChange, showSalePrice = false, errors = {} }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <FormField
        label={`Price (in ${currency}) is inclusive of tax`}
        type="number"
        id={`currencies-${currency}`}
        name={`currencies-${currency}`}
        min={0}
        placeholder={`Price (in ${currency}) is inclusive of tax`}
        onChange={(e) => onPriceChange(currency, e.target.value)}
        value={price}
        errorMessage={errors.currencies?.[currency]}
      />
      {showSalePrice && (
        <FormField
          label={`Sale Price (in ${currency})`}
          type="number"
          id={`salePrice-${currency}`}
          name={`salePrice-${currency}`}
          min={0}
          placeholder={`Sale Price (${currency})`}
          onChange={(e) => onSalePriceChange(currency, e.target.value)}
          value={salePrice ?? ''}
          errorMessage={errors.salePrice?.[currency]}
        />
      )}
    </div>
  );
};

export default CurrencyInputGroup;
