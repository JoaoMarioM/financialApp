import React from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { Container, Type, TypeText, ValueText, IconView } from './style'

export default function HistoricoList(props) {
    return (
        <TouchableWithoutFeedback onLongPress={() => props.deleteItem(props.data)}>
            <Container>
                <Type>
                    <IconView type={props.data.type} >
                        <FontAwesomeIcon icon={props.data.type === 'Despesa' ? faArrowDown : faArrowUp} color={'#fff'} />
                        <TypeText >{props.data.type}</TypeText>
                    </IconView>

                </Type>
                <ValueText>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.data.value)}
                </ValueText>
            </Container>
        </TouchableWithoutFeedback>

    );
}