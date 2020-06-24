const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);

const find = () => {
    return db("schemes");
}

const findById = (id) => {
    return db("schemes")
        .where("id", id);
}

const findSteps = (id) => {
    return db("steps as s")
        .innerJoin("schemes as c", "s.scheme_id", "c.id")
        .select("s.id", "c.scheme_name", "s.step_number", "s.instructions")
        .where("s.scheme_id", id)
        .orderBy("s.step_number");
}

const add = (scheme) => {
    return db("schemes")
        .insert({
            scheme_name: scheme.scheme_name
        }).then(id => {
            return findById(id[0]);
        });
}

const update = (changes, id) => {
    return db("schemes").where({id: id})
        .update({
            scheme_name: changes.scheme_name
        }).then(count => {
            return findById(id);
        });
}

const remove = (id) => {
    return db("schemes").where({id: id}).del();
}

const addStep = (step, scheme_id) => {
    return db("steps")
        .insert({
            step_number: step.step_number,
            instructions: step.instructions,
            scheme_id: scheme_id
        }).then(id => {
            return findSteps(scheme_id);
        });
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}