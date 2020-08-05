import styled from 'styled-components'

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#333'
})`
    width: 80%;
    height: ${props => `${props.height}px`};
    background-color: #fff;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
    font-size: 16px;
`
export const InputContainer = styled.View`
    flex-direction: row;
`