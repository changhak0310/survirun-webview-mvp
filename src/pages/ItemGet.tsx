/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { Link } from "react-router-dom";
import { css } from "@emotion/react"

interface OpacityProps {
    active: boolean;
}

//@ts-ignore
interface Window {
    Android?: {
        getItem: () => string | undefined;
    }
  }

const ItemGetStyle = styled.div<OpacityProps>`
    position: absolute;
    width: 100vw;
    height: 100vh;
    max-width: 412px;
    max-height: 915px;
    ${({active}) => 
        active ?
        css`opacity: 0;` :
        css`opacity: 1;`
    };
`
const Button = styled.button`
    width: 100px;
    height: 50px;
    background-color: #ff4d4d;
`
const LinkStyle = styled(Link)({
    color: "inherit",
    textDecoration: "none"
})


export const ItemGet = () => {
    const [item, setItem] = useState<string | null>(null);
    const [isOpacity, setIsOpacity] = useState(false);

    const SendAndroidItem = () => {
        try{
            return window.Android?.getItem();
        } catch(e) {
            console.error("Error: SendAndroidItem");
            console.error(e);
            return undefined;
        }
    }

    const GetItems = () => {
        try{
            const item = SendAndroidItem();
            //const item = window.ReactNativeWebView?.getItem();
            //const item = "야구공";
            console.log(item+" 아이템을 얻었습니다.");
            if (item !== null && item !== undefined) {
                const existingArray = JSON.parse(localStorage.getItem('item') || '[]');
                localStorage.setItem('item', JSON.stringify([...existingArray, item]));
                setItem(item)
                // localStorage.setItem("item", (pre: string[]) => {
                // const updatedState = pre.concat(item);
                // return updatedState;
                // });
            }
        } catch(e){
            console.error("Error: GetItems");
            console.error(e);
        }
    }

    useEffect(() => {
        GetItems();
        setIsOpacity(false)
    }, [0])

    const onClickButton = () => {
        setIsOpacity(pre => !pre);
    }

    return(
        <ItemGetStyle active={isOpacity}>
            {item}
            <Button onClick={onClickButton}>확인</Button>
            <LinkStyle to="../story">Next To Story</LinkStyle>
        </ItemGetStyle>
    )
}