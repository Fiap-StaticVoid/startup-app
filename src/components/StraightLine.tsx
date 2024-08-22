import {Box, ITextProps} from "native-base";
import React from "react";


export function StraightLine({...rest}) {
  return (
    <Box bg="accent.300" width="100%" height={0.4} my={2} {...rest}></Box>
  )
}