import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    background-color: ${Platform.OS === 'ios' ? '#333' : 'transparent'};
    position: absolute;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    flex: 1;
`
export const Header = styled.View`
    width: 100%;
    padding: 16px;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: #fff;
    border-bottom-width: 1px;
    border-color: grey;
`
export const Text = styled.Text`
    color: #000;
    font-size: 17px;
`