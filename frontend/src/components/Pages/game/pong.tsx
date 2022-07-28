/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pong.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbonnet <mbonnet@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/28 14:14:35 by mbonnet           #+#    #+#             */
/*   Updated: 2022/07/28 17:22:57 by mbonnet          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { HeroContainer } from "../PlayGame";

export const GamePong = () => {
	var W3CWebSocket = require('websocket').w3cwebsocket;
	var client = new W3CWebSocket('ws://localhost:3000/', 'echo-protocol');
	client.onopen = () => {
		client.send(JSON.stringify({type:"init"}));
	};
 		
		
	return (
		<HeroContainer>
			<Typography>
			</Typography>
		</HeroContainer>
	)
}


