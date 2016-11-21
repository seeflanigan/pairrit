# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161121055737) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pairs", force: :cascade do |t|
    t.string   "name"
    t.string   "channel_name"
    t.string   "channel_id"
    t.string   "team_id"
    t.string   "team_domain"
    t.string   "participants", default: [],              array: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["channel_id"], name: "index_pairs_on_channel_id", using: :btree
    t.index ["name"], name: "index_pairs_on_name", using: :btree
    t.index ["participants"], name: "index_pairs_on_participants", using: :btree
  end

end
