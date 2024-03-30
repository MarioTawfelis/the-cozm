import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { CompanyAddress, CountryData } from "../../types";
import countryService from "../../services/countries";
import addressService from "../../services/addresses";
import { ButtonsContainer, FormButton, FormFieldset, FormInput, FormLabel, FormTitle, ModalContainer, ModalOverlay, SuggestionItem, SuggestionsContainer, TwoColumnGrid } from "./AddressFrom.styles";


const AddressForm = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [countryInput, setCountryInput] = useState<string>('');
  const [countrySuggestions, setCountrySuggestions] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [addresses, setAddresses] = useState<CompanyAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<CompanyAddress | null>(null);
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');

  const [debouncedCountryInput] = useDebounce(countryInput, 500);

  useEffect(() => {
    if (debouncedCountryInput.length > 0) {
      countryService.searchCountries(debouncedCountryInput).then(setCountrySuggestions);
    } else {
      setCountrySuggestions([]);
    }
  }, [debouncedCountryInput]);

  useEffect(() => {
    if (companyName && selectedCountry) {
      addressService.fetchAddresses(companyName, selectedCountry.code).then((addresses) => {
        setAddresses(addresses);
      });
    }
  }, [companyName, selectedCountry]);

  useEffect(() => {
    if (selectedAddress !== null) {
      setCompanyName(selectedAddress.companyName)
      setStreetNumber(selectedAddress.streetNumber || '');
      setStreetName(selectedAddress.streetName || '');
      setCity(selectedAddress.city);
      setPostCode(selectedAddress.postCode);
    }

  }, [selectedAddress]);


  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const address = addresses[parseInt(event.target.value, 10)];
    setSelectedAddress(address);
  }

  const handleCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryInput(event.target.value);
  };

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setCountryInput(country.name); // Update the input field to show the selected country's name
    setCountrySuggestions([]); // Clear the suggestions selection
    setIsInputFocused(false); // Hide suggestions after selection
  };


  return (
    <ModalOverlay>
      <ModalContainer>
        <FormFieldset>
          <FormTitle>Destination Company Address</FormTitle>
          <TwoColumnGrid>
            <div style={{ gridArea: 'companyName' }}>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <FormInput
                id="companyName"
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
              />
            </div>

            <div style={{ gridArea: 'locations' }}>
              <FormLabel htmlFor="addressSelect">Locations</FormLabel>
              <FormInput as="select" id="addressSelect" onChange={handleAddressChange}>
                <option value="">Select an Address</option>
                {addresses.map((address, index) => {
                  return (
                    <option key={index} value={index}>
                      {address.companyName}, {address.streetNumber}, {address.streetName}, {address.city}, {address.postCode}
                    </option>
                  )
                })}
              </FormInput>
            </div>

            <div style={{ gridArea: 'streetNumber' }}>
              <FormLabel htmlFor="streetNumber">Street Number</FormLabel>
              <FormInput
                id="streetNumber"
                type="text"
                value={streetNumber}
                onChange={e => setStreetNumber(e.target.value)}
                placeholder="Street Number"
              />

            </div>

            <div style={{ gridArea: 'streetName' }}>
              <FormLabel htmlFor="streetName">Street Name</FormLabel>
              <FormInput
                id="streetName"
                type="text"
                value={streetName}
                onChange={e => setStreetName(e.target.value)}
                placeholder="Street Name"
              />
            </div>

            <div style={{ gridArea: 'city' }}>
              <FormLabel htmlFor="city">City</FormLabel>
              <FormInput
                id="city"
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <div style={{ gridArea: 'country' }}>
              <FormLabel htmlFor="country">Country</FormLabel>
              <FormInput
                type="text"
                value={countryInput}
                onChange={handleCountryInputChange}
                onFocus={() => setIsInputFocused(true)}
                placeholder="Start typing a country..."
              />
              {countrySuggestions.length > 0 && isInputFocused && (
                <SuggestionsContainer>
                  {countrySuggestions.map((country) => (
                    <SuggestionItem key={country.uuid} onClick={() => handleCountrySelect(country)}>
                      {country.name}
                    </SuggestionItem>
                  ))}
                </SuggestionsContainer>
              )}
            </div>

            <div style={{ gridArea: 'postalCode' }}>
              <FormLabel htmlFor="postCode">Post Code</FormLabel>
              <FormInput
                id="postCode"
                type="text"
                value={postCode}
                onChange={e => setPostCode(e.target.value)}
                placeholder="Post Code"
              />
            </div>
          </TwoColumnGrid>
        </FormFieldset>

        <ButtonsContainer>
          <FormButton type="button" onClick={() => { }}>Close</FormButton>
          <FormButton type="button" onClick={() => { }}>Add More</FormButton>
        </ButtonsContainer>

      </ModalContainer>
    </ModalOverlay>
  );



};

export default AddressForm;

