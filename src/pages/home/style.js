import styled from 'styled-components/native'

export const Info = styled.View`
    width: 100%;
    margin: 15px 0 25px 20px;
    justify-content: flex-start;
`
export const Balance = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #fff;
    font-weight: bold;
`
export const Moviment = styled.View`
    flex-direction: row;
    width: 100%;
    margin-left: 20px;
    align-items: center;
`
export const LestM = styled.Text`
    margin: 10px 0 5px 15px;
    color: #00b94a;
    font-size: 20px;

`
export const List = styled.FlatList.attrs({
    // marginHorizontal: 15
})`
    padding: 15px;
    margin: 15px 20px 0 20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
    width: 100%;
`