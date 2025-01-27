import { z } from "zod";
import jwt from "jsonwebtoken";
import express, { Router } from "express";

const contentRouter = Router();

contentRouter.get("/", (req, res) => { })

contentRouter.post("/", (req, res) => { })

contentRouter.delete("/", (req, res) => { })

// contentRouter.put("/",(req,res)=>{})

export { contentRouter }