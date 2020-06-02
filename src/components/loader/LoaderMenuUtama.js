import React from 'react'
import {
    View,
    Text
} from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function LoaderMenuUtama(props){
    return (
        <SkeletonPlaceholder
            speed={2000}
        >
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} marginHorizontal={10}/>
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} marginHorizontal={10}/>
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} marginHorizontal={10}/>
            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} marginHorizontal={10}/>
        </SkeletonPlaceholder>
    )
}