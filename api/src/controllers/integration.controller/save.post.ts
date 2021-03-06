/**
 * Copyright (c) AnyMessage.io. All rights reserved. http://www.anymessage.io
 *
 * The software in this package is published under the terms of the CPAL v1.0
 * license, a copy of which has been included with this distribution in the
 * LICENSE.md file.
 */
import { Response } from "express";
import { IntegrationModel, ITeamRequest } from "../../models";

export const postSave = async (req: ITeamRequest, res: Response) => {
    try {
        const integration = new IntegrationModel(req.app.get("db"), req.team.id, req.body.name);
        await integration.init();
        await integration.save(req.body.authentication, req.body.providers);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(e.status || 500);
        (e.status && e.message) ? res.json({ error: e.message }) : res.send();
    }
};
