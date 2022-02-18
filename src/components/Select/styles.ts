import styled from 'styled-components'

interface Props {
    isExpanded: boolean;
    optionsLenght: number;
}

export const Select = styled.div`
    position: relative;
`

export const ListOptions = styled.ul<Props>`
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    border: solid #ccc;
    background: #fff;
    border-width: 0 2px 2px 2px;
    border-radius: 0 0 .5rem .5rem; 
    transition: all .2s;
    height: ${({ isExpanded, optionsLenght }) => isExpanded ? `calc(${optionsLenght * 3}rem + 2px)` : 0}; 
    opacity: ${({ isExpanded }) => isExpanded ? 1 : 0}; 
    overflow: hidden;
    z-index: 3;
`

export const Option = styled.li`
    padding: .5rem;
    cursor: pointer;
`

export const Backdrop = styled.div<Omit<Props, "optionsLenght">>`
    background-color: red;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    display: ${({ isExpanded }) => isExpanded ? 'initial' : 'none'}; 
    z-index: 2;
    background: transparent;
`

export const Display = styled.div<Omit<Props, "optionsLenght">>`
    display: flex;
    align-items: center;
    height: 3rem;
    padding: .5rem; 
    border-radius: ${({ isExpanded }) => isExpanded ? ".5rem .5rem 0 0" : ".5rem"}; 
    border: solid 2px #ccc;
    position: relative;
    overflow: hidden;
    transition: all .2s;  
    cursor: pointer;

    &::after {
        content: '';        
        position: absolute;
        //background: red;
        //width: 10px;
        //height: 10px;
        border-bottom: solid 0 transparent;
        border-right: solid .4rem transparent;
        border-left: solid .4rem transparent;
        border-top: solid .4rem #ccc;        
        right: .4rem; 
        top: 50%;
        transform: translateY(-50%) rotatex(${({ isExpanded }) => isExpanded ? 180 : 0}deg);
        transition: all .2s;
    }
`