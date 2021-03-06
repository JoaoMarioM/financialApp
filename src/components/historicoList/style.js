import styled from 'styled-components/native'

export const Container = styled.View`
    margin-bottom: 5px;
    padding: 10px;
    /* box-shadow: 2px 2px rgba(0,0,0, 0.40); */
    background-color: rgba(0,0,0, 0.02);
`
export const Type = styled.View`
    flex-direction: row;
    box-shadow: 2px 2px rgba(0,0,0, 0.40);

`
export const TypeText = styled.Text`
    color:#fff;
    font-size: 16px;
    font-style: italic;
    margin-left: 5px;
`
export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.type === 'Despesa' ? '#c62c36' : '#049301'};
    width: auto;
    padding: 3px 8px 3px 8px;
    border-radius: 7px;
`
export const ValueText = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
    margin-top: 5px
`