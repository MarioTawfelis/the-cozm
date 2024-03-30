import styled from 'styled-components';

export const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 800px;
  max-width: 70%;
  z-index: 1001;
`;

export const FormTitle = styled.h2`
  text-align: left;
  margin-bottom: 32px;
  color: #000;
`;

export const FormFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 
    "companyName country"
    "locations locations" 
    "streetNumber streetName"
    "city postalCode";
    ". buttons";
  grid-gap: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #000;
`;

export const FormInput = styled.input`
  display: block;
  width: 80%;
  padding: 12px;
  background-color: white; 
  border: none; 
  border-bottom: 1px solid #CCC;
  margin-bottom: 16px;
  color: #000;
`;

export const ButtonsContainer = styled.div`
  grid-area: buttons; 
  display: flex;
  justify-content: right; /* Center buttons horizontally */
`;

export const FormButton = styled.button`
  // display: inline-block;
  background-color: #8a2be2;
  color: #FFFFFF;
  border: none;
  padding: 12px 45px;
  margin-right: 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #7b29e2;
  }
`;

export const SuggestionsContainer = styled.div`
  border: 1px solid #CCC; 
  border-radius: 4px;
  background: white;
  position: absolute; 
  width: 80%
  max-height: 200px;
  overflow-y: auto; 
  z-index: 10; 
`;

export const SuggestionItem = styled.div`
  padding: 12px;
  color: black; 
  cursor: pointer; 

  &:hover {
    background-color: #f0f0f0; 
  }
`;